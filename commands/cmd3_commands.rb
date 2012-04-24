require 'ruble'



# ********************************************************
# COMMAND+3 UI Factories
# ********************************************************

command 'uiWebView' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiWebView.js")
    input << "\n"
  end
end

command 'uiImageTransformScale' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiImageTransformScale.js")
    input << "\n"
  end
end

command 'uiLogin' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiLogin.js")
    input << "\n"
  end
end

command 'uiTable' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTable.js")
    input << "\n"
  end
end

command 'uiMap' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiMap.js")
    input << "\n"
  end
end

command 'uiSplash' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiSplash.js")
    input << "\n"
  end
end

command 'uiTwitterTable' do |cmd|
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTwitterTable.js")
    input << "\n"
  end
end


command 'uiVideoTable' do |cmd|
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiVideoTable.js")
    input << "\n"
  end
end

command 'uiChess' do |cmd|
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiChess.js")
    input << "\n"
  end
end

command 'uiNav' do |cmd|
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiNav.js")
    input << "\n"
  end
end

command 'uiTemplate' do |cmd|
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTemplate.js")
    input << "\n"
  end
end

command 'requireTemplate' do |cmd|
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/requireTemplate.js")
    input << "\n"
  end
end