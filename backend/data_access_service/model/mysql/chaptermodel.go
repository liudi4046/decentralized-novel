package mysql

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ ChapterModel = (*customChapterModel)(nil)

type (
	// ChapterModel is an interface to be customized, add more methods here,
	// and implement the added methods in customChapterModel.
	ChapterModel interface {
		chapterModel
		FindOneByHash(ctx context.Context, hash string) (*Chapter, error)
		withSession(session sqlx.Session) ChapterModel
	}

	customChapterModel struct {
		*defaultChapterModel
	}
)

// NewChapterModel returns a model for the database table.
func NewChapterModel(conn sqlx.SqlConn) ChapterModel {
	return &customChapterModel{
		defaultChapterModel: newChapterModel(conn),
	}
}

func (m *customChapterModel) withSession(session sqlx.Session) ChapterModel {
	return NewChapterModel(sqlx.NewSqlConnFromSession(session))
}

func (m *customChapterModel) FindOneByHash(ctx context.Context, hash string) (*Chapter, error) {
	query := fmt.Sprintf("select %s from %s where `hash` = ? limit 1", chapterRows, m.table)
	var resp Chapter
	err := m.conn.QueryRowCtx(ctx, &resp, query, hash)
	switch err {
	case nil:
		return &resp, nil
	case sqlx.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}
