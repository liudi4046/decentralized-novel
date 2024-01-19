package logic

import (
	"context"

	"data_access_service/internal/svc"
	"data_access_service/internal/types"
	"data_access_service/model/mysql"

	"github.com/zeromicro/go-zero/core/logx"
)

type ChapterFindByHashLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewChapterFindByHashLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ChapterFindByHashLogic {
	return &ChapterFindByHashLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ChapterFindByHashLogic) ChapterFindByHash(req *types.ChapterFindByHashRequest) (resp *types.ChapterFindByHashResponse, err error) {
	var chapterContentArray []string
	for i := 0; i < len(req.ChapterHashArray); i++ {
		chapter, err := l.svcCtx.ChapterModel.FindOneByHash(l.ctx, req.ChapterHashArray[i])
		if err != nil && err != mysql.ErrNotFound {
			return &types.ChapterFindByHashResponse{
				Status:              "Error",
				Code:                "-1",
				Message:             err.Error(),
				ChapterContentArray: []string{},
			}, nil
		}
		if err == mysql.ErrNotFound {
			chapterContentArray = append(chapterContentArray, "")
		} else {
			chapterContentArray = append(chapterContentArray, chapter.Content)
		}
	}

	return &types.ChapterFindByHashResponse{
		Status:              "Success",
		Code:                "200",
		Message:             "Operation successful",
		ChapterContentArray: chapterContentArray,
	}, nil
}
