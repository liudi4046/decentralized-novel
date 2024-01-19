package logic

import (
	"context"
	"strconv"

	"data_access_service/internal/svc"
	"data_access_service/internal/types"
	"data_access_service/model/mysql"

	"github.com/zeromicro/go-zero/core/logx"
)

type CommentFindByChapterHashLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCommentFindByChapterHashLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CommentFindByChapterHashLogic {
	return &CommentFindByChapterHashLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CommentFindByChapterHashLogic) CommentFindByChapterHash(req *types.CommentFindByChapterHashRequest) (resp *types.CommentFindByChapterHashResponse, err error) {
	var comments []types.Comment
	raw_comments, err := l.svcCtx.CommentModel.FindAllByChapterHash(l.ctx, req.ChapterHash)
	if err != nil && err != mysql.ErrNotFound {
		return &types.CommentFindByChapterHashResponse{
			Status:   "Error",
			Code:     "-1",
			Message:  err.Error(),
			Comments: []types.Comment{},
		}, nil
	}
	if raw_comments == nil {
		return &types.CommentFindByChapterHashResponse{
			Status:   "Success",
			Code:     "200",
			Message:  "Comment not found",
			Comments: []types.Comment{},
		}, nil
	}

	for _, comment := range *raw_comments {
		comments = append(comments, types.Comment{
			CommentId:      strconv.Itoa(int(comment.Id)),
			WallentAddress: comment.WalletAddress,
			Comment:        comment.Comment,
		})
	}

	return &types.CommentFindByChapterHashResponse{
		Status:   "Success",
		Code:     "200",
		Message:  "Operation successful",
		Comments: comments,
	}, nil
}
