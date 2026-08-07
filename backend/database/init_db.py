from database.base import Base
from database.db import engine

# Import all models here
import models.user
import models.incident
import models.memory
import models.contact


def init_database():
    Base.metadata.create_all(bind=engine)