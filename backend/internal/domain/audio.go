package domain

import (
	"context"
	"io"
	"time"
)

type Audio struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Duration    int       `json:"duration"`
	ContentType string    `json:"content_type"`
	Size        int64     `json:"size"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type AudioRepository interface {
	Store(ctx context.Context, audio *Audio) error
	GetByID(ctx context.Context, id string) (*Audio, error)
	GetStream(ctx context.Context, id string) (io.ReadCloser, error)
}
