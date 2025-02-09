package service

import (
	"context"

	"github.com/braeden6/gtd/internal/domain"
)

type InboxService struct {
	repo domain.InboxRepository
}

func NewInboxService(repo domain.InboxRepository) *InboxService {
	return &InboxService{repo: repo}
}

func (s *InboxService) CreateInboxItem(ctx context.Context, item *domain.InboxItem) error {
	return s.repo.Create(ctx, item)
}

func (s *InboxService) GetInboxItem(ctx context.Context, id string) (*domain.InboxItem, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *InboxService) ListInboxItems(ctx context.Context, userID string) ([]*domain.InboxItem, error) {
	return s.repo.List(ctx, userID)
}

func (s *InboxService) UpdateInboxItem(ctx context.Context, item *domain.InboxItem) error {
	return s.repo.Update(ctx, item)
}

func (s *InboxService) DeleteInboxItem(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
