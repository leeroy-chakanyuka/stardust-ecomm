package stardust.shop.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;


public enum Gender {
    MEN("men"),
    WOMEN("women"),
    KIDS("kids"),
    UNISEX("unisex");

    private final String code;

    Gender(String code) {
        this.code = code;
    }

    @JsonValue
    public String getCode() {
        return code;
    }

    @JsonCreator
    public static Gender fromCode(String code) {
        if (code == null) return null;
        for (Gender g : values()) {
            if (g.code.equalsIgnoreCase(code.trim())) return g;
        }
        throw new IllegalArgumentException("Unknown gender: " + code);
    }
}
