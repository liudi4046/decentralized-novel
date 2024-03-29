// Code generated by goctl. DO NOT EDIT.
package handler

import (
	"net/http"

	"data_access_service/internal/svc"

	"github.com/zeromicro/go-zero/rest"
)

func RegisterHandlers(server *rest.Server, serverCtx *svc.ServiceContext) {
	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/chapter/add",
				Handler: ChapterAddHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/chapter/findByHash",
				Handler: ChapterFindByHashHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/comment/add",
				Handler: CommentAddHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/comment/delete",
				Handler: CommentDeleteHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/comment/findByChapterHash",
				Handler: CommentFindByChapterHashHandler(serverCtx),
			},
		},
	)
}
