require 'ruble'



# ********************************************************
# COMMAND+4 Vendor Samples 
# ********************************************************

command 'acsLoginSimple' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryVendor/acsLoginSimple.js")
    input << "\n"
  end
end

command 'acsPlaces' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryVendor/acsPlaces.js")
    input << "\n"
  end
end

command 'acsCustomObj' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryVendor/acsCustomObj.js")
    input << "\n"
  end
end

command 'awsDynamo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryVendor/awsDynamo.js")
    input << "\n"
  end
end

command 'intelSplash' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryVendor/intelSplash.js")
    input << "\n"
  end
end

command 'intelRev' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryVendor/intelRevenue.js")
    input << "\n"
  end
end

command 'intelNewHire' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryVendor/intelNewHire.js")
    input << "\n"
  end
end

