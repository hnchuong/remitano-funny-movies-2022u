class User
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable

  ## Database authenticatable
  field :username,           type: String, default: ""
  field :encrypted_password, type: String, default: ""

  include Mongoid::Timestamps

  validates_presence_of :username, :encrypted_password
  validates :username, format: { with: /\A[a-zA-Z0-9]+\Z/ }, uniqueness: true
  index({ username: 1 }, { unique: true })
end
