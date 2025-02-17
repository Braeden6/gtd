package domain

import (
	"context"
	"time"

	"gorm.io/gorm"
)

type InboxItem struct {
	ID          string         `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID      string         `json:"user_id" gorm:"type:uuid;not null;index"`
	Content     string         `json:"content" gorm:"type:text;not null"`
	AudioPath   string        `json:"audio_path" gorm:"type:text"`
	ImagePath   string        `json:"image_path" gorm:"type:text"`
	Processed   bool           `json:"processed" gorm:"default:false"`
	CreatedAt   time.Time      `json:"created_at" gorm:"not null;default:CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time      `json:"updated_at" gorm:"not null;default:CURRENT_TIMESTAMP"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}

type InboxRepository interface {
	Create(ctx context.Context, item *InboxItem) error
	GetByID(ctx context.Context, id string) (*InboxItem, error)
	List(ctx context.Context, userID string) ([]*InboxItem, error)
	Update(ctx context.Context, item *InboxItem) error
	Delete(ctx context.Context, id string) error
}
