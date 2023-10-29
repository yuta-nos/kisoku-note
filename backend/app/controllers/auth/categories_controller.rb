class Auth::CategoriesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    categories = Category.all
    render status: 200, json: { data: categories }
  end

  def show
    category = Category.find(params[:id])
    render status: 200, json: category, serializer: CategorySerializer
  end

  def create
    category = Category.create!(category_params)
    if category.save
      render status: 200, json: { data: category }
    else
      render status: 400, json: { data: category.errors }
    end
  end

  def update
    category = Category.find_by(id: params[:id])
    category.update(category_params)
    render status: 200, json: category, serializer: CategorySerializer
  end

  def destroy
    category = Category.find_by(id: params[:id])
    if category.destroy
      render status: 200, json: { message: "削除成功" }
    else
      render status: 400, json: { data: category.errors }
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :team_id)
  end
end
