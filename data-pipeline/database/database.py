import os
from dotenv import load_dotenv
from pgvector.psycopg2 import register_vector
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, event

load_dotenv()

DB_URL = os.getenv("POSTGRES_URL")

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@event.listens_for(engine, "connect")
def receive_connect(dbapi_connection, connection_record):
    register_vector(dbapi_connection)
