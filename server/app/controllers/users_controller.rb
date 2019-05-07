class UsersController < ApplicationController


  def create
    user = User.create(username: params[:username])
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
