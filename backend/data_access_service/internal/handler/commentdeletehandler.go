package handler

import (
	"net/http"

	"data_access_service/internal/logic"
	"data_access_service/internal/svc"
	"data_access_service/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func CommentDeleteHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.CommentDeleteRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewCommentDeleteLogic(r.Context(), svcCtx)
		resp, err := l.CommentDelete(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
