require "test_helper"

class Auth::CategoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get auth_categories_index_url
    assert_response :success
  end

  test "should get show" do
    get auth_categories_show_url
    assert_response :success
  end

  test "should get create" do
    get auth_categories_create_url
    assert_response :success
  end

  test "should get update" do
    get auth_categories_update_url
    assert_response :success
  end

  test "should get destroy" do
    get auth_categories_destroy_url
    assert_response :success
  end
end
