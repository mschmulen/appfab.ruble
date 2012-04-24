
#PayPal button
command 'PayPal button' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "  \n"    
    input << "var ppButton = Titanium.Paypal.createPaypalButton(\n"
    input << "{\n"
    input << "  width: 294,\n"
    input << "  height: 50,\n"
    input << "  bottom: 50,\n"
    input << "  appId: \"APP-80W284485P519543T\",\n"
    input << "  buttonStyle: Ti.Paypal.BUTTON_294x43,\n"
    input << "  paypalEnvironment: Ti.Paypal.PAYPAL_ENV_SANDBOX,\n"
    input << "  feePaidByReceiver: false,\n"
    input << "  transactionType: Ti.Paypal.PAYMENT_TYPE_DONATION,\n"
    input << "  enableShipping: false,\n"
    input << "  payment: {\n"
    input << "    amount: win.data.amt,\n"
    input << "    tax: 0.00,\n"
    input << "    shipping: 0.00,\n"
    input << "    currency: \"USD\",\n"
    input << "    recipient: \"osama@x.com\",\n"
    input << "    itemDescription: \"Donation\",\n"
    input << "    merchantName: \"American Red Cross\"\n"
    input << "}\n"
    input << "});\n"

  end
end

# paint demo
command 'paint demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiPaint.js")
    input << "\n"
  end
end


#Stacker demo BOX2D
command 'stacker demo Box2D' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiStacker.js")
    input << "\n"
  end
end

#charts demo
command 'charts demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiCharts.js")
    input << "\n"
  end
end

#gears demo
command 'gears demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiGears.js")
    input << "\n"
  end
end


#ogl demo
command 'ogl demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiOpengl.js")
    input << "\n"
  end
end

#quicklook demo
command 'quicklook demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiQuickLook.js")
    input << "\n"
  end
end

#pageFlip demo
command 'pageflip demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiPageFlip.js")
    input << "\n"
  end
end

#barcode demo
command 'barcode demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiBardcodeReader.js")
    input << "\n"
  end
end

#pageFlip demo
command 'sms demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uisms.js")
    input << "\n"
  end
end


#pageFlip demo
command 'styledLabel demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/styledLabel.js")
    input << "\n"
  end
end

#urban airship demo
command 'urban airship demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/urban.js")
    input << "\n"
  end
end


