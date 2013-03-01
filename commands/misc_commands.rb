require 'ruble'




# ********************************************************
# COMMAND+4 Vendor Factories
# ********************************************************

#command 'model SQLITE' do |cmd|
#  cmd.key_binding = "Control+4"
#  cmd.key_binding.mac = "Command+4"
#
#  cmd.output = :insert_as_snippet
#  cmd.input = :selection, :line
#  cmd.invoke do |context|
#   
#    input = STDIN.read
#    input << "\n"
#    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModel/modelSQLITE.js")
#    input << "\n"
#  end
#end


# ********************************************************
# COMMAND+5
# ********************************************************

# ********************************************************
# COMMAND+6 
# ********************************************************

# ********************************************************
# COMMAND+7 
# ********************************************************

# ********************************************************
# COMMAND+9  PULL FROM GIST'S
# ********************************************************


command 'OPEN THIS FILE' do |cmd|
  cmd.key_binding = "Control+9"
  cmd.key_binding.mac = "Command+9"
  
  cmd.output = :discard
  cmd.input = :none
  cmd.invoke do |context|
    require 'uri'
    url = "file:#{URI.escape(ENV['TM_FILEPATH'])}"
    context.browser.open(url, :browser => :default)
  
  end
end

command 'ls' do |cmd|
  cmd.key_binding = "Control+9"
  cmd.key_binding.mac = "Command+9"
  
  cmd.output = :output_to_console
  cmd.invoke do |context|
    `pwd`
    #`ls ~/Users/username`
  end
  
end


# ********************************************************
# COMMAND +=     Titanium + Module short cuts.
# ********************************************************


# ********************************************************
# ********************************************************
# ********************************************************
# ********************************************************



#command 'format HTML' do |cmd|
  #cmd.scope = '*.js'
#  cmd.key_binding = "Control+1"
#  cmd.key_binding.mac = "Command+1"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
#  cmd.output = :insert_as_snippet
#  cmd.input = :selection, :line
#  cmd.invoke do |context|
#    input = STDIN.read
#    input.gsub(/[\$`\\]/, '\\1').gsub(/([ \t]*)(.+)/, '\1<${1:li}>\2</${1:li}>')
#  end
#end


#command 'insert FOO' do |cmd|
  #cmd.scope = '*.js'
  
#  cmd.key_binding = "Control+H"
#  cmd.key_binding.mac = "Command+H"
  
#  cmd.output = :insert_as_snippet
#  cmd.input = :selection, :line
#  cmd.invoke do |context|
#    input = STDIN.read
#    input.gsub(/[\$`\\]/, '\\1').gsub(/([ \t]*)(.+)/, '\1<${1:li}>\2</${1:li}>')
#  end
#end



#command "Open Image" do |cmd|
#  cmd.scope = "*.js"
  
  #cmd.key_binding = "Control+H"
  #cmd.key_binding.mac = "Command+H"
  
#  cmd.input = [ :selection, :word ]
#  cmd.output = :show_as_html
  
#  cmd.invoke do |context|
#    url = "http://apidock.com/rails/search/quick?query=" + CGI.escape(context.input)
#    context.browser.open url, :new_window => true
#  end
#end



