package repository

import (
	"context"

	"github.com/braeden6/gtd/internal/domain"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type InboxRepository struct {
	db *gorm.DB
}

func NewInboxRepository(db *gorm.DB) *InboxRepository {
	return &InboxRepository{db: db}
}

func (r *InboxRepository) Create(ctx context.Context, item *domain.InboxItem) error {
	if item.ID == "" {
		item.ID = uuid.New().String()
	}
	return r.db.WithContext(ctx).Create(item).Error
}

func (r *InboxRepository) GetByID(ctx context.Context, id string) (*domain.InboxItem, error) {
	var item domain.InboxItem
	err := r.db.WithContext(ctx).First(&item, "id = ?", id).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	return &item, err
}

func (r *InboxRepository) List(ctx context.Context, userID string) ([]*domain.InboxItem, error) {
	var items []*domain.InboxItem
	err := r.db.WithContext(ctx).
		Where("user_id = ?", userID).
		Order("created_at desc").
		Find(&items).Error
	return items, err
}

func (r *InboxRepository) Update(ctx context.Context, item *domain.InboxItem) error {
	return r.db.WithContext(ctx).Save(item).Error
}

func (r *InboxRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&domain.InboxItem{}, "id = ?", id).Error
}
