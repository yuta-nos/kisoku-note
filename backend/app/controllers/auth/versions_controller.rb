class Auth::VersionsController < ApplicationController
  def index
  end

  def show
  end

  def create
    version = Version.create!(version_params)
    if version
      render status: 200, json: { data: version }
    else
      render status: 400, json: { data: version.errors }
    end
  end

  def update
    version = Version.update(version_params)
    render status: 200, json: { data: version }
  end

  def destroy
  end

  private
  def version_params
    params.require(:version).permit(:document_id, :body, :reason, :number)
  end
end
