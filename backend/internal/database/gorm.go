package database

import (
	"fmt"

	"github.com/braeden6/gtd/internal/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type PostgresConfig struct {
	Host     string
	User     string
	Password string
	DBName   string
	Port     string
}

func NewGormDB(config PostgresConfig) (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		config.Host, config.User, config.Password, config.DBName, config.Port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("error opening database: %w", err)
	}

	// Run migrations
	err = db.AutoMigrate(&domain.InboxItem{})
	if err != nil {
		return nil, fmt.Errorf("error running migrations: %w", err)
	}

	return db, nil
}
