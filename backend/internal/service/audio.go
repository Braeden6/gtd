package service

import (
	"context"
	"fmt"
	"io"
	"time"

	"github.com/braeden6/gtd/internal/domain"
	"github.com/google/uuid"
)

type AudioService struct {
	repo domain.AudioRepository
}

func NewAudioService(repo domain.AudioRepository) *AudioService {
	return &AudioService{
		repo: repo,
	}
}

func (s *AudioService) StreamAudio(ctx context.Context, id string) (io.ReadCloser, error) {
	audio, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	return s.repo.GetStream(ctx, audio.ID)
}

func (s *AudioService) UploadAudio(ctx context.Context, file io.Reader, filename string) (string, error) {

	audio := &domain.Audio{
		ID:          uuid.New().String(),
		Title:       filename,
		Duration:    100,
		ContentType: "audio/mpeg",
		Size:        100,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	if err := s.repo.Store(ctx, audio); err != nil {
		return "", fmt.Errorf("failed to store audio metadata: %w", err)
	}

	return audio.ID, nil
}
