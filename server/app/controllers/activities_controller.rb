class ActivitiesController < ApplicationController

  def create
    activity = Activity.create(activity_params)
    if activity
      render json: activity
    else
      render json: {error: "Activity could not be created"}, status: 400
    end
  end

  def update
    activity = Activity.find_by(activity_params)
    if activity
      activity.update(activity_params)
      render json: activity
    else
      render json: {error: "Could not update"}, status: 404
    end
  end

  def destroy
    activity = Activity.find_by(activity_params)
    if activity
      activity.destroy
      render json: {message: "Activity destroyed"}
    else
      render json: {error: "Could not destroy"}, status: 404
    end
  end

  private

  def activity_params
    # { activity: { location: "Greece"}}
    # { location: "Athens"}
    params.require(:activity).permit(:location, :name, :beginning_time, :end_time, :user_id)
  end

end
