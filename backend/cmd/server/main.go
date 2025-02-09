package main

import (
	"log"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"

	_ "github.com/braeden6/gtd/docs"
	"github.com/braeden6/gtd/internal/api"
	"github.com/braeden6/gtd/internal/database"
	"github.com/braeden6/gtd/internal/repository"
	"github.com/braeden6/gtd/internal/service"
	"github.com/braeden6/gtd/pkg/storage"
)

// @title GTD API
// @version 1.0
// @description Getting Things Done API
// @host localhost:3000
// @BasePath /api
func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(
		middleware.CORSConfig{
			AllowOrigins:     []string{"*"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
			AllowHeaders:     []string{"*"},
			AllowCredentials: true,
			ExposeHeaders:    []string{"Content-Length", "Content-Type"},
		},
	))

	// Add Swagger endpoint
	e.GET("/swagger/*", echoSwagger.WrapHandler)

	dbConfig := database.PostgresConfig{
		Host:     os.Getenv("DB_HOST"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   os.Getenv("DB_NAME"),
		Port:     os.Getenv("DB_PORT"),
	}

	minioService, err := storage.NewMinioService(storage.MinioConfig{
		Endpoint:        "minio:9000",
		AccessKeyID:     "minioadmin",
		SecretAccessKey: "minioadmin",
		UseSSL:          false,
		BucketName:      "audio-files",
	})
	if err != nil {
		log.Fatal(err)
	}

	db, err := database.NewGormDB(dbConfig)
	if err != nil {
		e.Logger.Fatal(err)
	}

	inboxRepo := repository.NewInboxRepository(db)
	inboxService := service.NewInboxService(inboxRepo)
	inboxHandler := api.NewInboxHandler(inboxService)

	audioRepo := repository.NewAudioRepository(db, minioService)
	audioService := service.NewAudioService(audioRepo)
	audioHandler := api.NewAudioHandler(audioService)

	api := e.Group("/api")
	inboxHandler.RegisterRoutes(api)
	audioHandler.RegisterRoutes(api)

	e.Logger.Fatal(e.Start(":3000"))
}
