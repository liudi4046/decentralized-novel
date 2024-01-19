package logic

import (
	"context"

	"data_access_service/internal/svc"
	"data_access_service/internal/types"
	"data_access_service/model/mysql"

	"github.com/zeromicro/go-zero/core/logx"
)

type CommentAddLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCommentAddLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CommentAddLogic {
	return &CommentAddLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CommentAddLogic) CommentAdd(req *types.CommentAddRequest) (resp *types.CommentAddResponse, err error) {

	_, err = l.svcCtx.CommentModel.Insert(l.ctx, &mysql.Comment{
		ChapterHash:   req.ChapterHash,
		WalletAddress: req.WalletAddress,
		Comment:       req.Comment,
	})
	if err != nil {
		return &types.CommentAddResponse{
			Status:  "Error",
			Code:    "-1",
			Message: err.Error(),
		}, err
	}

	return &types.CommentAddResponse{
		Status:  "Success",
		Code:    "200",
		Message: "Operation successful",
	}, nil
}
