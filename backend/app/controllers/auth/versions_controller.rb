class Auth::VersionsController < ApplicationController

  before_action :authenticate_user!

  def index
    versions = Version.all
    render json: versions
  end

  def show
    version = Version.find_by(id: params[:id])
    render status: 200, json: { data: version }
  end

  def create
    version = Version.create!(version_params)
    if version.save
      render status: 200, json: { data: version }
    else
      render status: 400, json: { data: version.errors }
    end
  end

  def update
    version = Version.find_by(id: params[:id])
    if version.update(version_params)
      render status: 200, json: { data: version }
    else
      render status: 400, json: { data: version.errors }
    end
  end

  def destroy
    version = Version.find_by(id: params[:id])
    if version.destroy
      render status: 200, json: { message: "削除成功" }
    else
      render status: 400, json: { data: version.errors }
    end
  end

  private
  def version_params
    params.require(:version).permit(:document_id, :body, :reason, :number)
  end
end
