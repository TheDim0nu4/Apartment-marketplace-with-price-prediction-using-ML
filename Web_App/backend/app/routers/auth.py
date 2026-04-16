from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from psycopg2.extensions import connection

from app.database import get_db
from app.schemas.user import TokenResponse, UserOut, UserRegister
from app.security import create_access_token, get_current_user, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserRegister, conn: connection = Depends(get_db)):
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email = %s", (payload.email,))
    existing = cursor.fetchone()
    if existing:
        cursor.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    hashed_pw = hash_password(payload.password)
    cursor.execute(
        "INSERT INTO users (email, hashed_password) VALUES (%s, %s) RETURNING *",
        (payload.email, hashed_pw)
    )
    user = cursor.fetchone()
    conn.commit()
    cursor.close()

    token = create_access_token({"sub": str(user["id"])})
    return TokenResponse(access_token=token, user=user)


@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), conn: connection = Depends(get_db)):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (form_data.username,))
    user = cursor.fetchone()
    cursor.close()
    
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token({"sub": str(user["id"])})
    return TokenResponse(access_token=token, user=user)


@router.get("/me", response_model=UserOut)
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
