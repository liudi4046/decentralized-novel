package svc

import (
	"data_access_service/internal/config"
	"data_access_service/model/mysql"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

type ServiceContext struct {
	Config       config.Config
	ChapterModel mysql.ChapterModel
	CommentModel mysql.CommentModel
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:       c,
		ChapterModel: mysql.NewChapterModel(sqlx.NewMysql(c.Mysql.DataSource)),
		CommentModel: mysql.NewCommentModel(sqlx.NewMysql(c.Mysql.DataSource)),
	}
}
