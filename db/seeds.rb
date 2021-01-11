require Rails.root.join("data", "urls.rb")
require 'fastimage'

# USERS (7)
  User.create(email: "admin@graphica.com",
    password: 'password', password_confirmation: 'password'
  )
  User.create(email: "rod_dod@gmail.com", 
    banner_image: IMAGE_URLS.sample,
    image: "https://images.unsplash.com/photo-1588948138600-bc75fd417834?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    first_name: "Rod", last_name: "Stewart", password: 'password', password_confirmation: 'password', tagline: "I've been taking pictures for a long time. I really enjoy sharing my work and seeing others.")
  User.create(email: "binda_binda@gmail.com", 
    banner_image: IMAGE_URLS.sample,
    image: "https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
    first_name: "Belinda",last_name: "Howard", password: 'password', password_confirmation: 'password', tagline: "I’m a kickass part-time nature photographer that frequently takes helicopter flights for work. Check out my Oceanography collection. I’m open to working together.")
  User.create(email: "turtles42@gmail.com",
    banner_image: IMAGE_URLS.sample,
    image: "https://images.unsplash.com/photo-1593839686924-4b344fac3f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    first_name: "Leigh",last_name: "Bray", password: 'password', password_confirmation: 'password', tagline: "I’m a kickass part-time nature photographer that frequently takes helicopter flights for work. Check out my Oceanography collection. I’m open to working together.")
  User.create(email: "sun.n.moon87@gmail.com", 
    banner_image: IMAGE_URLS.sample,
    image: "https://images.unsplash.com/photo-1593771009063-e2a5fc81be47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=646&q=80",
    first_name: "Chera",last_name: "Moond", password: 'password', password_confirmation: 'password', tagline: "I’m a kickass part-time nature photographer that frequently takes helicopter flights for work. Check out my Oceanography collection. I’m open to working together.")
  User.create(email: "make_movement@gmail.com", 
    banner_image: IMAGE_URLS.sample,
    image: "https://images.unsplash.com/photo-1593591182784-05bba029a8cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80",
    first_name: "Lasha",last_name: "Quinn", password: 'password', password_confirmation: 'password', tagline: "I’m a kickass part-time nature photographer that frequently takes helicopter flights for work. Check out my Oceanography collection. I’m open to working together.")
  User.create(email: "unicornsarerainbows@gmail.com", 
    banner_image: IMAGE_URLS.sample,
    image: "https://images.unsplash.com/photo-1593793602373-ca02114d4a3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    first_name: "Laura",last_name: "Zak", password: 'password', password_confirmation: 'password', tagline: "I’m a kickass part-time nature photographer that frequently takes helicopter flights for work. Check out my Oceanography collection. I’m open to working together.")
  User.create(email: "chateaubrion@gmail.com", 
    banner_image: IMAGE_URLS.sample,
    image: "https://images.unsplash.com/photo-1525129075020-d43c7ba72ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
    first_name: "Fird",last_name: "Mann", password: 'password', password_confirmation: 'password', tagline: "I’m a kickass part-time nature photographer that frequently takes helicopter flights for work. Check out my Oceanography collection. I’m open to working together.")

#CATEGORIES (18)
  Category.create(title: "Athletics")
  Category.create(title: "Animals")
  Category.create(title: "Art")
  Category.create(title: "Architecture") 
  Category.create(title: "Business")
  Category.create(title: "Culture")
  Category.create(title: "Experimental")
  Category.create(title: "Fashion")
  Category.create(title: "Film")
  Category.create(title: "Food")
  Category.create(title: "Geometry") 
  Category.create(title: "History")
  Category.create(title: "Landscape") 
  Category.create(title: "Nature") 
  Category.create(title: "Technology") 
  Category.create(title: "Textures") 
  Category.create(title: "Travel") 
  Category.create(title: "Wellness")
    
colors = []
7.times do
  color = Faker::Color.color_name
  colors << color
end

#PICTURES (47)
users = User.all
categories = Category.all
IMAGE_URLS.map { |url| 

  size = []
  size = FastImage.size(url)
  width = size.first
  height = size.last
  ratio = (width.to_f/height)

  Picture.create(
    category_id: (rand(18)+1), 
    user_id: (rand(4)+2), 
    title: "#{colors[rand(7)]}  #{Faker::Dessert.variety}".titleize,
    url: url,
    ratio: ratio,
    description: Faker::Lorem.sentence(word_count: 3, supplemental: true),
    views: rand(1...3000)
    )
}

User.all.each do |user|
  pic_amount = user.pictures.length()
  half_amount = (pic_amount/2).round
  puts "pic amount #{pic_amount}"
  puts half_amount
  1.times do
    i = 0

    collection_1 = Collection.create(
      user_id: user.id,
      title: "#{Faker::Appliance.equipment}".titleize,
      description: "This is my collection from pictures I took last summer.",
    )
    
    collection_2 = Collection.create(
      user_id: user.id, 
      title: Faker::Movies::HarryPotter.location,
      description: "Photos from college",
    )
    
    if pic_amount > 0
      for index in  (0..half_amount) 
      # for index in (0..pic_amount-1)
        CollectionPicture.create(collection_id: collection_1.id, picture_id: user.pictures[index].id)
      end
      for index in ((half_amount)..(pic_amount - 1)) ##this might not always work
      # for index in (0..pic_amount-1)
        CollectionPicture.create(collection_id: collection_2.id, picture_id: user.pictures[index].id)
      end
    end
    
  end
end

#PICTURE COMMENTS (50)
  40.times do    
    PictureComment.create(user_id: (rand(7)+2), picture_id: (rand(47)+1), body: Faker::Movies::BackToTheFuture.quote)
  end
  40.times do    
    PictureComment.create(user_id: (rand(7)+2), picture_id: (rand(47)+1), body: Faker::Movies::StarWars.quote)
  end
  40.times do    
    PictureComment.create(user_id: (rand(7)+2), picture_id: (rand(47)+1), body: Faker::Movies::BackToTheFuture.quote)
  end
  

puts "Data Seeded.."
puts " admin@graphica.com "
# puts "Emails: alex@gmail.com, bob@gmail.com, chris@gmail.com, sam@gmail.com, bill@gmail.com, matt@gmail.com, juan@gmail.com password: 'password' "