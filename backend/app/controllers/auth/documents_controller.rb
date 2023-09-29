class Auth::DocumentsController < ApplicationController

  def index
    
  end

  def show
    documents = Document.where(doc_num: params[:id])
    render status: 200, json: { data: documents }
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
    render status: 200, json: { data: document }
  end

  def destroy
  end

  private
  
  def document_params
    params.require(:document).permit(:doc_num, :title, :body, :category_id, :version, :reason)
  end

end
