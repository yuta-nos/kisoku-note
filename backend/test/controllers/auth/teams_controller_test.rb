require "test_helper"

class Auth::TeamsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get auth_teams_show_url
    assert_response :success
  end

  test "should get update" do
    get auth_teams_update_url
    assert_response :success
  end

  test "should get destroy" do
    get auth_teams_destroy_url
    assert_response :success
  end
end
