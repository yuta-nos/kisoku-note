require "test_helper"

class Auth::VersionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get auth_versions_index_url
    assert_response :success
  end

  test "should get show" do
    get auth_versions_show_url
    assert_response :success
  end

  test "should get create" do
    get auth_versions_create_url
    assert_response :success
  end

  test "should get update" do
    get auth_versions_update_url
    assert_response :success
  end

  test "should get destroy" do
    get auth_versions_destroy_url
    assert_response :success
  end
end
