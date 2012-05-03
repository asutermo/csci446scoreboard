class ScoresController < ApplicationController
	respond_to :json

	def index
		@scores = Score.all
		respond_to do |format|
			format.json {render json: @scores }
		end

	end

	def create
		@score = Score.new(:score => params[:score], :username => params[:username])

		respond_to do |format|
	      if @score.save
	        format.json { render json: @score, status: :created, location: @score}
	      else
	        format.json { render json: @score.errors, status: :unprocessable_entity }
	      end
    	end
	end
end
