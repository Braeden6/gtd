package service

import (
	"context"
	"io"

	"github.com/braeden6/gtd/pkg/storage"
	"mime/multipart"
	"github.com/google/uuid"
	"fmt"
)

type StorageService interface {
    Store(ctx context.Context, path string, content io.Reader, size int64, contentType string) error
	Get(ctx context.Context, path string) (io.ReadCloser, error)
	StoreFile(ctx context.Context, fileType string, file *multipart.FileHeader) (string, error)
}

type storageService struct {
	minioService *storage.MinioService
}

func NewStorageService(minioService *storage.MinioService) StorageService {
	return &storageService{
		minioService: minioService,
	}
}

func (s *storageService) Store(ctx context.Context, path string, content io.Reader, size int64, contentType string) error {
	return s.minioService.PutObject(ctx, path, content, size, contentType)
}

func (s *storageService) Get(ctx context.Context, path string) (io.ReadCloser, error) {
	return s.minioService.GetObject(ctx, path)
}

func (s *storageService) StoreFile(ctx context.Context, fileType string, file *multipart.FileHeader) (string, error) {
    if file == nil {
        return "", nil
    }

    src, err := file.Open()
    if err != nil {
        return "", fmt.Errorf("error opening file: %w", err)
    }
    defer src.Close()

    path := fmt.Sprintf("%s/%s/%s", fileType, uuid.New(), file.Filename)
    err = s.minioService.PutObject(
        ctx,
        path,
        src,
        file.Size,
        file.Header.Get("Content-Type"),
    )
    if err != nil {
        return "", fmt.Errorf("error storing file: %w", err)
    }

    return path, nil
}