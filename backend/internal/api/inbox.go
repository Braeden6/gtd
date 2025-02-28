package api

import (
	"fmt"
	"net/http"
	"mime/multipart"
	"github.com/braeden6/gtd/internal/domain"
	"github.com/braeden6/gtd/internal/service"
	"github.com/labstack/echo/v4"
	"time"
	"os"
	"io"
	"math/rand"
)

type InboxHandler struct {
	service        *service.InboxService
	storageService service.StorageService
}

func NewInboxHandler(service *service.InboxService, storageService service.StorageService) *InboxHandler {
	return &InboxHandler{
		service:        service,
		storageService: storageService,
	}
}

func (h *InboxHandler) RegisterRoutes(g *echo.Group) {
	inbox := g.Group("/inbox")
	inbox.POST("", h.Create)
	inbox.GET("", h.List)
	inbox.GET("/:id", h.GetByID)
	inbox.PUT("/:id", h.Update)
	inbox.DELETE("/:id", h.Delete)
	inbox.POST("/quick-capture", h.QuickCapture)
	inbox.GET("/benchmark", h.BenchmarkOperation)
}


type QuickCaptureRequest struct {
    Audio *multipart.FileHeader `form:"audio"`
    Note  string               `form:"note"`
}

// QuickCaptureResponse represents the output from the quick capture endpoint
type QuickCaptureResponse struct {
    Message string `json:"message"`
    ItemID  string `json:"itemId"`
}

// QuickCapture godoc
// @Summary Quick capture inbox item
// @Description Create a new inbox item with optional media attachments
// @Tags inbox
// @Accept multipart/form-data
// @Produce json
// @Param audio formData file false "Audio file"
// @Param note formData string false "Text note"
// @Success 201 {object} QuickCaptureResponse
// @Router /inbox/quick-capture [post]
func (h *InboxHandler) QuickCapture(c echo.Context) error {
	note := c.FormValue("note")

    audio, err := c.FormFile("audio")
    if err != nil && err != http.ErrMissingFile {
        return c.JSON(http.StatusBadRequest, map[string]string{
            "error": fmt.Sprintf("Error processing audio file: %v", err),
        })
    }

	image, err := c.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": fmt.Sprintf("Error processing image file: %v", err),
		})
	}

	imagePath, err := h.storageService.StoreFile(c.Request().Context(), "image", image)
    if err != nil {
        return c.JSON(http.StatusInternalServerError, map[string]string{
            "error": err.Error(),
        })
    }

    audioPath, err := h.storageService.StoreFile(c.Request().Context(), "audio", audio)
    if err != nil {
        return c.JSON(http.StatusInternalServerError, map[string]string{
            "error": err.Error(),
        })
    }

	item := domain.InboxItem{
		UserID: "40c8bdda-fc65-41d9-a29b-f5e4d2407dad",
		Content: note,
		AudioPath: audioPath,
		ImagePath: imagePath,
	}
	if err := h.service.CreateInboxItem(c.Request().Context(), &item); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

    return c.JSON(http.StatusCreated, QuickCaptureResponse{
        Message: "Quick capture successful",
        ItemID:  item.ID,
    })
}

// Create godoc
// @Summary Create inbox item
// @Description Create a new inbox item
// @Tags inbox
// @Accept json
// @Produce json
// @Param item body domain.InboxItem true "Inbox Item"
// @Success 201 {object} domain.InboxItem
// @Router /inbox [post]
func (h *InboxHandler) Create(c echo.Context) error {
	var item domain.InboxItem
	if err := c.Bind(&item); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	item.UserID = "40c8bdda-fc65-41d9-a29b-f5e4d2407dad"

	if err := h.service.CreateInboxItem(c.Request().Context(), &item); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, item)
}

// List godoc
// @Summary List inbox items
// @Description Get all inbox items for the user
// @Tags inbox
// @Accept json
// @Produce json
// @Success 200 {array} domain.InboxItem
// @Router /inbox [get]
func (h *InboxHandler) List(c echo.Context) error {
	// TODO: Get from auth context
	userID := "40c8bdda-fc65-41d9-a29b-f5e4d2407dad"

	items, err := h.service.ListInboxItems(c.Request().Context(), userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, items)
}

// GetByID godoc
// @Summary Get inbox item by ID
// @Description Get a single inbox item by its ID
// @Tags inbox
// @Accept json
// @Produce json
// @Param id path string true "Inbox Item ID"
// @Success 200 {object} domain.InboxItem
// @Router /inbox/{id} [get]
func (h *InboxHandler) GetByID(c echo.Context) error {
	id := c.Param("id")

	item, err := h.service.GetInboxItem(c.Request().Context(), id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	if item == nil {
		return c.NoContent(http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, item)
}

// Update godoc
// @Summary Update inbox item
// @Description Update an existing inbox item
// @Tags inbox
// @Accept json
// @Produce json
// @Param id path string true "Inbox Item ID"
// @Param item body domain.InboxItem true "Inbox Item"
// @Success 200 {object} domain.InboxItem
// @Router /inbox/{id} [put]
func (h *InboxHandler) Update(c echo.Context) error {
	id := c.Param("id")

	var item domain.InboxItem
	if err := c.Bind(&item); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	item.ID = id

	if err := h.service.UpdateInboxItem(c.Request().Context(), &item); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, item)
}

// Delete godoc
// @Summary Delete inbox item
// @Description Delete an inbox item
// @Tags inbox
// @Accept json
// @Produce json
// @Param id path string true "Inbox Item ID"
// @Success 204 "No Content"
// @Router /inbox/{id} [delete]
func (h *InboxHandler) Delete(c echo.Context) error {
	id := c.Param("id")

	if err := h.service.DeleteInboxItem(c.Request().Context(), id); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.NoContent(http.StatusNoContent)
}

// BenchmarkOperation godoc
// @Summary Benchmark CPU and I/O operations
// @Description Performs CPU-intensive calculations and simulates I/O operations for benchmarking
// @Tags inbox
// @Accept json
// @Produce json
// @Param iterations query int false "Number of calculation iterations" default(100000)
// @Param io_type query string false "I/O operation type (file, minio, postgres, all)" default(all)
// @Success 200 {object} map[string]interface{}
// @Router /inbox/benchmark [get]
func (h *InboxHandler) BenchmarkOperation(c echo.Context) error {
	// Get parameters with defaults
	iterations := 100000
	ioType := "all"

	// Parse query parameters if provided
	if iterParam := c.QueryParam("iterations"); iterParam != "" {
		fmt.Sscanf(iterParam, "%d", &iterations)
	}
	if ioTypeParam := c.QueryParam("io_type"); ioTypeParam != "" {
		ioType = ioTypeParam
	}

	startTime := time.Now()

	// CPU-intensive operation - calculate prime numbers
	primeCount := 0
	for i := 2; i < iterations; i++ {
		isPrime := true
		for j := 2; j*j <= i; j++ {
			if i%j == 0 {
				isPrime = false
				break
			}
		}
		if isPrime {
			primeCount++
		}
	}
	
	cpuTime := time.Since(startTime)
	ioStartTime := time.Now()
	
	// I/O operations based on selected type
	ioResults := make(map[string]interface{})
	
	// File I/O
	if ioType == "file" || ioType == "all" {
		fileStart := time.Now()
		// Create a temporary file to simulate I/O
		tempFile, err := os.CreateTemp("", "benchmark-*.txt")
		if err == nil {
			defer os.Remove(tempFile.Name())
			defer tempFile.Close()
			
			// Write some data
			data := make([]byte, 1024*100) // 100KB of data
			rand.Read(data)
			tempFile.Write(data)
			
			// Flush to disk
			tempFile.Sync()
			
			// Read it back
			tempFile.Seek(0, 0)
			io.ReadAll(tempFile)
			
			ioResults["file_io_ms"] = time.Since(fileStart).Milliseconds()
		} else {
			ioResults["file_io_error"] = err.Error()
		}
	}
	
	// MinIO I/O
	if ioType == "minio" || ioType == "all" {
		minioStart := time.Now()
		
		// Generate random data
		data := make([]byte, 1024*100) // 100KB of data
		rand.Read(data)
		
		// Store the data using the benchmark method
		objectName := fmt.Sprintf("benchmark-%d.bin", time.Now().UnixNano())
		filePath, err := h.storageService.StoreBenchmarkBytes(c.Request().Context(), data, objectName)
		if err == nil {
			ioResults["minio_io_ms"] = time.Since(minioStart).Milliseconds()
			ioResults["minio_object_path"] = filePath
		} else {
			ioResults["minio_upload_error"] = err.Error()
		}
	}
	
	// PostgreSQL I/O
	if ioType == "postgres" || ioType == "all" {
		pgStart := time.Now()
		
		// Create a benchmark inbox item
		benchmarkItem := &domain.InboxItem{
			UserID:  "40c8bdda-fc65-41d9-a29b-f5e4d2407dad",
			Content: fmt.Sprintf("Benchmark test at %s", time.Now().Format(time.RFC3339)),
		}
		
		// Insert into database
		err := h.service.CreateInboxItem(c.Request().Context(), benchmarkItem)
		if err == nil {
			// Read it back
			_, err := h.service.GetInboxItem(c.Request().Context(), benchmarkItem.ID)
			if err == nil {
				// Delete it
				err = h.service.DeleteInboxItem(c.Request().Context(), benchmarkItem.ID)
				if err == nil {
					ioResults["postgres_io_ms"] = time.Since(pgStart).Milliseconds()
					ioResults["postgres_operation"] = "create-read-delete"
				} else {
					ioResults["postgres_delete_error"] = err.Error()
				}
			} else {
				ioResults["postgres_read_error"] = err.Error()
			}
		} else {
			ioResults["postgres_create_error"] = err.Error()
		}
	}

	ioTime := time.Since(ioStartTime)
	totalTime := time.Since(startTime)

	return c.JSON(http.StatusOK, map[string]interface{}{
		"status":       "success",
		"iterations":   iterations,
		"prime_count":  primeCount,
		"cpu_time_ms":  cpuTime.Milliseconds(),
		"io_time_ms":   ioTime.Milliseconds(),
		"total_time_ms": totalTime.Milliseconds(),
		"io_details":   ioResults,
	})
}
