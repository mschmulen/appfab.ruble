require 'ruble'


command 'open in browser' do |cmd|
  cmd.key_binding = "Control+9"
  cmd.key_binding.mac = "Command+9"
  cmd.output = :output_to_console
  cmd.input = :selection
  cmd.invoke do |context|
    selection = ENV['TM_SELECTED_TEXT']
    context.browser.open(selection, :browser => :default)   
  end
end

command 'Open Document in Default Browser' do |cmd|
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