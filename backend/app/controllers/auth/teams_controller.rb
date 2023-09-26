class Auth::TeamsController < ApplicationController

  before_action :authenticate_user!

  def show
    team = Team.find(params[:id])
    render status: 200, json: team, serializer: TeamSerializer
  end

  def create
  end

  def update
    team = Team.find(params[:id])
    if team.update( team_params )
      render status: 200, json: { data: team }
    else
      render status: 400, json: { data: team.errors }
    end
  end

  def destroy
  end

  private

  def team_params
    params.require(:team).permit(:name)
  end

end
