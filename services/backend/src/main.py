from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from src.core.settings import settings
from src.core.util import get_all_routers
from src.service.audio_transcription_result import AudioTranscriptionResultProcessor
from starlette.middleware.sessions import SessionMiddleware
from supertokens_python import init, InputAppInfo, SupertokensConfig
from supertokens_python.recipe import session
from supertokens_python import get_all_cors_headers
from supertokens_python.framework.fastapi.fastapi_middleware import get_middleware
from supertokens_python.recipe import thirdparty
from supertokens_python.recipe.thirdparty import ProviderInput, ProviderConfig, ProviderClientConfig, SignInAndUpFeature

async def lifespan(app: FastAPI):
    app.state.processor = AudioTranscriptionResultProcessor()
    app.state.processor.start()
    yield
    await app.state.processor.stop()
    
init(
    app_info=InputAppInfo(
        app_name="GTD",
        api_domain=settings.API_URL,
        website_domain=settings.FRONTEND_URL,
    ),
    supertokens_config=SupertokensConfig(
        connection_uri=settings.SUPERTOKENS_URL,
    ),
    framework="fastapi",
    recipe_list=[
        session.init(
            # tech debt: should be removed
            cookie_same_site="none",
            cookie_secure=True,
            anti_csrf="NONE",
        ),
        thirdparty.init(
            sign_in_and_up_feature=SignInAndUpFeature(
                providers=[
                    ProviderInput(
                        config=ProviderConfig(
                            third_party_id="google",
                            clients=[
                                ProviderClientConfig(
                                    client_id=settings.GOOGLE_CLIENT_ID,
                                    client_secret=settings.GOOGLE_CLIENT_SECRET,
                                ),
                            ],
                        ),
                    ),
                ]
            )
        )
    ]
)

app = FastAPI(title="GTD Service", lifespan=lifespan) # type: ignore
app.add_middleware(get_middleware())
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.FRONTEND_URL.split(','),
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type"] + get_all_cors_headers(),
)
app.add_middleware(SessionMiddleware, secret_key=settings.SESSION_SECRET_KEY)


@app.middleware("http")
async def origin_validation_middleware(request: Request, call_next):
    # allowing post to inbox from any origin for chrome extension
    if request.url.path.endswith("inbox/") and request.method == "POST":
        response = await call_next(request)
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("origin")
        return response
    
    # allow only restricted origins for all other routes because cookies same site is none
    origin = request.headers.get("origin")
    if origin and origin in settings.FRONTEND_URL.split(','):
        return await call_next(request)
    
    return JSONResponse(
        status_code=403,
        content={"detail": "Origin not allowed"}
    )

all_routers = get_all_routers()
for router in all_routers:
    app.include_router(router)

@app.get("/health")
async def health_check():
    return "ok"