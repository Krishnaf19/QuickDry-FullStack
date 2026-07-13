import { FaStar } from "react-icons/fa";

function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <img
            src={review.user?.image}
            alt={review.user?.fullName}
            className="w-12 h-12 rounded-full object-cover border"
          />

          <div>
            <h3 className="font-semibold text-gray-800">
              {review.user?.fullName}
            </h3>

            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < review.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}

              <span className="ml-2 text-sm text-gray-600">
                {review.rating}/5
              </span>
            </div>
          </div>

        </div>

      </div>

      <p className="mt-4 text-gray-600 leading-relaxed">
        {review.comment}
      </p>

    </div>
  );
}

export default ReviewCard;