package logic

import (
	"context"

	"data_access_service/internal/svc"
	"data_access_service/internal/types"
	"data_access_service/model/mysql"

	"github.com/zeromicro/go-zero/core/logx"
)

type ChapterAddLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewChapterAddLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ChapterAddLogic {
	return &ChapterAddLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ChapterAddLogic) ChapterAdd(req *types.ChapterAddRequest) (resp *types.ChapterAddResponse, err error) {

	_, err = l.svcCtx.ChapterModel.Insert(l.ctx, &mysql.Chapter{
		Hash:    req.ChapterHash,
		Content: req.Content,
	})
	if err != nil {
		return &types.ChapterAddResponse{
			Status:  "Error",
			Code:    "-1",
			Message: err.Error(),
		}, err
	}

	return &types.ChapterAddResponse{
		Status:  "Success",
		Code:    "200",
		Message: "Operation successful",
	}, nil
}
