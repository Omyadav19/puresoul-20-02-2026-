# server/migrate_pro.py
# Run once to apply Pro-tier schema changes to the existing MySQL database.
# Usage: python migrate_pro.py

import os
from dotenv import load_dotenv
from app import app
from models import db

load_dotenv()

def run_migration():
    with app.app_context():
        conn = db.engine.connect()
        
        print("🔄 Starting Pro-tier migration...")

        # ── 1. Add is_pro column to users (if not already there) ──
        try:
            conn.execute(db.text(
                "ALTER TABLE users ADD COLUMN is_pro TINYINT(1) NOT NULL DEFAULT 0"
            ))
            conn.commit()
            print("✅ Added 'is_pro' column to 'users' table.")
        except Exception as e:
            if "Duplicate column name" in str(e) or "1060" in str(e):
                print("ℹ️  'is_pro' column already exists — skipping.")
            else:
                print(f"❌ Error adding 'is_pro': {e}")

        # ── 2. Create therapy_sessions table ──
        try:
            conn.execute(db.text("""
                CREATE TABLE IF NOT EXISTS therapy_sessions (
                    id          INT AUTO_INCREMENT PRIMARY KEY,
                    user_id     INT NOT NULL,
                    session_title VARCHAR(255),
                    started_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
                    ended_at    DATETIME,
                    is_active   TINYINT(1) NOT NULL DEFAULT 1,
                    CONSTRAINT fk_ts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            """))
            conn.commit()
            print("✅ 'therapy_sessions' table ready.")
        except Exception as e:
            print(f"❌ Error creating 'therapy_sessions': {e}")

        # ── 3. Create therapy_messages table ──
        try:
            conn.execute(db.text("""
                CREATE TABLE IF NOT EXISTS therapy_messages (
                    id              INT AUTO_INCREMENT PRIMARY KEY,
                    session_id      INT NOT NULL,
                    sender          VARCHAR(10) NOT NULL,
                    message_text    TEXT NOT NULL,
                    emotion_detected VARCHAR(50),
                    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_tm_session FOREIGN KEY (session_id) REFERENCES therapy_sessions(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            """))
            conn.commit()
            print("✅ 'therapy_messages' table ready.")
        except Exception as e:
            print(f"❌ Error creating 'therapy_messages': {e}")

        conn.close()
        print("\n🎉 Migration complete! Restart your Flask server.")

if __name__ == '__main__':
    run_migration()
