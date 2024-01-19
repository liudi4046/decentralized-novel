// Code generated by goctl. DO NOT EDIT.

package mysql

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"github.com/zeromicro/go-zero/core/stores/builder"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"github.com/zeromicro/go-zero/core/stringx"
)

var (
	chapterFieldNames          = builder.RawFieldNames(&Chapter{})
	chapterRows                = strings.Join(chapterFieldNames, ",")
	chapterRowsExpectAutoSet   = strings.Join(stringx.Remove(chapterFieldNames, "`id`", "`create_at`", "`create_time`", "`created_at`", "`update_at`", "`update_time`", "`updated_at`"), ",")
	chapterRowsWithPlaceHolder = strings.Join(stringx.Remove(chapterFieldNames, "`id`", "`create_at`", "`create_time`", "`created_at`", "`update_at`", "`update_time`", "`updated_at`"), "=?,") + "=?"
)

type (
	chapterModel interface {
		Insert(ctx context.Context, data *Chapter) (sql.Result, error)
		FindOne(ctx context.Context, id int64) (*Chapter, error)
		Update(ctx context.Context, data *Chapter) error
		Delete(ctx context.Context, id int64) error
	}

	defaultChapterModel struct {
		conn  sqlx.SqlConn
		table string
	}

	Chapter struct {
		Id      int64  `db:"id"` // Primary Key
		Hash    string `db:"hash"`
		Content string `db:"content"`
	}
)

func newChapterModel(conn sqlx.SqlConn) *defaultChapterModel {
	return &defaultChapterModel{
		conn:  conn,
		table: "`chapter`",
	}
}

func (m *defaultChapterModel) Delete(ctx context.Context, id int64) error {
	query := fmt.Sprintf("delete from %s where `id` = ?", m.table)
	_, err := m.conn.ExecCtx(ctx, query, id)
	return err
}

func (m *defaultChapterModel) FindOne(ctx context.Context, id int64) (*Chapter, error) {
	query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", chapterRows, m.table)
	var resp Chapter
	err := m.conn.QueryRowCtx(ctx, &resp, query, id)
	switch err {
	case nil:
		return &resp, nil
	case sqlx.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultChapterModel) Insert(ctx context.Context, data *Chapter) (sql.Result, error) {
	query := fmt.Sprintf("insert into %s (%s) values (?, ?)", m.table, chapterRowsExpectAutoSet)
	ret, err := m.conn.ExecCtx(ctx, query, data.Hash, data.Content)
	return ret, err
}

func (m *defaultChapterModel) Update(ctx context.Context, data *Chapter) error {
	query := fmt.Sprintf("update %s set %s where `id` = ?", m.table, chapterRowsWithPlaceHolder)
	_, err := m.conn.ExecCtx(ctx, query, data.Hash, data.Content, data.Id)
	return err
}

func (m *defaultChapterModel) tableName() string {
	return m.table
}