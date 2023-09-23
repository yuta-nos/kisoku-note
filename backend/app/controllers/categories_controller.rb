class CategoriesController < ApplicationController

  def index
    categories = Category.all
    render status: 200, json: { data: categories }
  end

  def show
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
  end

  def destroy
  end

  private

  def category_params
    params.require(:category).permit(:name, :team_id)
  end

end
