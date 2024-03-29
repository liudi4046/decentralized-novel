// Code generated by goctl. DO NOT EDIT.
package types

type ChapterAddRequest struct {
	ChapterHash string `json:"chapterHash"`
	Content     string `json:"content"`
}

type ChapterAddResponse struct {
	Status  string `json:"status"`
	Code    string `json:"code"`
	Message string `json:"message"`
}

type ChapterFindByHashRequest struct {
	ChapterHashArray []string `json:"chapterHashArray"`
}

type ChapterFindByHashResponse struct {
	Status              string   `json:"status"`
	Code                string   `json:"code"`
	Message             string   `json:"message"`
	ChapterContentArray []string `json:"chapterContentArray"`
}

type Comment struct {
	CommentId      string `json:"commentId"`
	WallentAddress string `json:"walletAddress"`
	Comment        string `json:"comment"`
	Timestamp      string `json:"timestamp"`
}

type CommentAddRequest struct {
	ChapterHash   string `json:"chapterHash"`
	WalletAddress string `json:"walletAddress"`
	Comment       string `json:"comment"`
}

type CommentAddResponse struct {
	Status  string `json:"status"`
	Code    string `json:"code"`
	Message string `json:"message"`
}

type CommentDeleteRequest struct {
	CommentId string `json:"commentId"`
}

type CommentDeleteResponse struct {
	Status  string `json:"status"`
	Code    string `json:"code"`
	Message string `json:"message"`
}

type CommentFindByChapterHashRequest struct {
	ChapterHash string `json:"chapterHash"`
}

type CommentFindByChapterHashResponse struct {
	Status   string    `json:"status"`
	Code     string    `json:"code"`
	Message  string    `json:"message"`
	Comments []Comment `json:"comments"`
}
