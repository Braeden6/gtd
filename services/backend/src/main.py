from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
        session.init(),
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
    allow_methods=["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allow_headers=["Content-Type"] + get_all_cors_headers(),
)

app.add_middleware(SessionMiddleware, secret_key=settings.SESSION_SECRET_KEY)

all_routers = get_all_routers()
for router in all_routers:
    app.include_router(router)
    

@app.get("/health")
async def health_check():
    return "ok"