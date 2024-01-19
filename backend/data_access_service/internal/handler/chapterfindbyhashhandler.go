package handler

import (
	"net/http"

	"data_access_service/internal/logic"
	"data_access_service/internal/svc"
	"data_access_service/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func ChapterFindByHashHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ChapterFindByHashRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewChapterFindByHashLogic(r.Context(), svcCtx)
		resp, err := l.ChapterFindByHash(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
