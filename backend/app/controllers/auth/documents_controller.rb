class Auth::DocumentsController < ApplicationController
  before_action :authenticate_user!

  def index
    # 確認用
    documents = Document.all
    render json: documents
  end

  def show
    document = Document.find_by(doc_num: params[:id])
    render status: 200, json: document, serializer: DocumentSerializer
  end

  def create
    document = Document.create!(document_params)
    if document.save
      render status: 200, json: { data: document }
    else
      render status: 400, json: { data: document.errors }
    end
  end

  def update
    document = Document.find_by(doc_num: params[:id])
    document.update(document_params)
    render status: 200, json: document, serializer: DocumentSerializer
  end

  def destroy
    document = Document.find_by(id: params[:id])
    if document.destroy
      render status: 200, json: { message: "削除成功" }
    else
      render status: 400, json: { data: document.errors }
    end
  end

  private
  
  def document_params
    params.require(:document).permit(:doc_num, :title, :body, :category_id, :version, :reason)
  end

end
