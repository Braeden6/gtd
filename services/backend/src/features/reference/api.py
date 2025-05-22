from fastapi import Depends, status
from typing import Annotated
from uuid import UUID
from src.features.reference.schemas import SearchReference, ReferenceCreate, ReferenceUpdate
from src.features.reference.service import ReferenceService
from src.core.dependencies import current_active_user
from src.features.reference.model import Reference
from src.features.user.model import User
from src.core.dependencies import get_protected_router
from gtd_shared.core.logging import get_logger

logger = get_logger()

router = get_protected_router(prefix="/reference", tags=["reference"])

@router.get("/", response_model=list[Reference], status_code=status.HTTP_200_OK, summary="Get all references for the current user")
async def get_user_references(
    reference_service: Annotated[ReferenceService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await reference_service.get_all(current_user.id)
    
@router.post("/", response_model=Reference, status_code=status.HTTP_201_CREATED, summary="Create a new reference for the current user")
async def create_reference(
    create_reference: ReferenceCreate,
    reference_service: Annotated[ReferenceService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await reference_service.create(Reference(user_id=current_user.id, **create_reference.model_dump()))

@router.post("/search", response_model=list[Reference], status_code=status.HTTP_200_OK, summary="Search for references for the current user")
async def search_reference(
    search_reference: SearchReference,
    reference_service: Annotated[ReferenceService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await reference_service.search(current_user.id, search_reference)

@router.patch("/{reference_id}", response_model=Reference, status_code=status.HTTP_200_OK, summary="Update a reference for the current user")
async def update_reference(
    reference_id: UUID,
    update_reference: ReferenceUpdate,
    reference_service: Annotated[ReferenceService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await reference_service.update(reference_id, current_user.id, update_reference)

@router.delete("/{reference_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a reference for the current user")
async def delete_reference(
    reference_id: UUID,
    reference_service: Annotated[ReferenceService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await reference_service.delete(reference_id, current_user.id)