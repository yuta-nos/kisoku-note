class TeamsController < ApplicationController
  def show
    team = Team.find(params[:id])
    render status: 200, json: team, serializer: TeamSerializer
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def team_params
  end

end
