package repository

import (
	"context"
	"io"

	"github.com/braeden6/gtd/internal/domain"
	"github.com/braeden6/gtd/pkg/storage"
	"gorm.io/gorm"
)

type audioRepository struct {
	db    *gorm.DB
	minio *storage.MinioService
}

func NewAudioRepository(db *gorm.DB, minio *storage.MinioService) domain.AudioRepository {
	return &audioRepository{
		db:    db,
		minio: minio,
	}
}

func (r *audioRepository) Store(ctx context.Context, audio *domain.Audio) error {
	return r.db.WithContext(ctx).Create(audio).Error
}

func (r *audioRepository) GetByID(ctx context.Context, id string) (*domain.Audio, error) {
	var audio domain.Audio
	if err := r.db.WithContext(ctx).First(&audio, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &audio, nil
}

func (r *audioRepository) GetStream(ctx context.Context, id string) (io.ReadCloser, error) {
	obj, err := r.minio.GetObject(ctx, id)
	if err != nil {
		return nil, err
	}
	return obj, nil
}
