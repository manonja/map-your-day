class UsersController < ApplicationController


  def create
    name = params[:username]
    user = User.find_or_create_by(username: name)

    if user
      render json: user
    else
      render json: {error: "Erorr creating user"}, status: 400
    end 
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user
    else
      render json: {error: "This user does not exist?"}, status: 404
    end
  end
end
