package logic

import (
	"context"
	"strconv"

	"data_access_service/internal/svc"
	"data_access_service/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CommentDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCommentDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CommentDeleteLogic {
	return &CommentDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CommentDeleteLogic) CommentDelete(req *types.CommentDeleteRequest) (resp *types.CommentDeleteResponse, err error) {
	commentId, _ := strconv.ParseInt(req.CommentId, 0, 64)
	err = l.svcCtx.CommentModel.Delete(l.ctx, commentId)
	if err != nil {
		return &types.CommentDeleteResponse{
			Status:  "Error",
			Code:    "-1",
			Message: err.Error(),
		}, nil
	}

	return &types.CommentDeleteResponse{
		Status:  "Success",
		Code:    "200",
		Message: "Operation successful",
	}, nil
}
